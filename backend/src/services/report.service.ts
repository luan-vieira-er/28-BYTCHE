import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

type RelatorioConsulta = {
  paciente: {
    nome: string;
    idade: number;
  };
  psicologo: {
    nome: string;
    crp: string;
  };
  data: string; // ISO string ou formato 'dd/mm/yyyy'
  topicos: string[];
  conversa: { autor: 'psicologo' | 'paciente'; mensagem: string }[];
  avaliacao_ia?: string;
};

export async function gerarRelatorioConsulta(dados: RelatorioConsulta, caminhoSaida = 'relatorio.pdf') {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();

  let y = height - 50;

  const drawText = (text: string, size = 12, spacing = 20) => {
    page.drawText(text, { x: 50, y, size, font, color: rgb(0, 0, 0) });
    y -= spacing;
  };

  drawText('📋 Relatório da Consulta Psicológica', 18, 30);

  drawText(`🧒 Paciente: ${dados.paciente.nome}`);
  drawText(`Idade: ${dados.paciente.idade}`);
  drawText(`🧠 Psicólogo(a): ${dados.psicologo.nome} (CRP: ${dados.psicologo.crp})`);
  drawText(`📅 Data da sessão: ${dados.data}`);
  drawText('');

  drawText('🧩 Tópicos Abordados:', 14);
  dados.topicos.forEach((t) => drawText(`- ${t}`));
  drawText('');

  drawText('💬 Conversa:', 14);
  dados.conversa.forEach((msg) => {
    drawText(`${msg.autor === 'psicologo' ? 'Psicólogo:' : 'Paciente:'} ${msg.mensagem}`);
  });
  drawText('');

  if (dados.avaliacao_ia) {
    drawText('📝 Observações Finais:', 14);
    drawText(dados.avaliacao_ia);
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(caminhoSaida, pdfBytes);
  console.log('✅ Relatório gerado com sucesso em:', caminhoSaida);
}
