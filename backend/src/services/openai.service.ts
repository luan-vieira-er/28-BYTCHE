const axios = require('axios');
require('dotenv').config();

const functions = [
  {
    name: "suggest_patient_responses",
    description: "Gera opções de resposta para uma criança responder ao psicólogo virtual",
    parameters: {
      type: "object",
      properties: {
        responses: {
          type: "array",
          items: {
            type: "object",
            properties: {
              option: {
                type: "string",
                description: "Letra identificadora da opção (A, B, C, D)"
              },
              text: {
                type: "string",
                description: "Texto da resposta da criança, em linguagem simples"
              }
            },
            required: ["option", "text"]
          },
          minItems: 4,
          maxItems: 4
        }
      },
      required: ["responses"]
    }
  }
];

export const startChat = async (roomId) => {
  //Busca essas variáveis pelo roomId

  const finalidade = "primeira consulta";
  const perfil_paciente = "Criança de 7 anos, tímida, dificuldade em socializar na escola.";
  const restricoes = "Não falar sobre separação dos pais.";
  const foco = "emocional e social";
  const historico_previo = "Relato da escola indica episódios de choro frequente e isolamento durante o recreio.";
  const nome_paciente = "juninho"
  const idade = "10"

  const systemPrompt = `
    Você é um psicólogo infantil virtual muito gentil, carinhoso e acolhedor. Vai conversar com uma criança usando linguagem simples, respeitosa e afetuosa. Seu objetivo é criar um espaço seguro para a criança se expressar sobre si mesma, seus sentimentos, seu corpo e sua rotina — sem julgamentos e sem pressão.

    📌 Informações fornecidas pelo médico:
    - 🩺 Finalidade da consulta: ${finalidade}
    - 👧 Perfil do paciente: ${perfil_paciente}
    - 🚫 Restrições temáticas: ${restricoes}
    - 🎯 Foco da escuta e da coleta: ${foco}
    - 📚 Histórico prévio: ${historico_previo}

    📌 Informações do paciente:
    - Idade: ${idade}.
    - Nome: ${nome_paciente}

    💡 Instruções para você:
    - Acolha e se adapte às informações acima.
    - Se a criança parecer tímida, diga: “Pode me contar no seu tempo, tá bom? Tô aqui pra te ouvir com calma.”
    - Faça perguntas com carinho e sem pressa.
    - Nunca pressione.
    - Evite os temas listados em "restricoes".
    - Foque nos temas listados em "foco".
    - Considere o "historico_previo" com sensibilidade, se útil.

    💬 Frases de apoio que você pode usar quando fizer sentido:
    - “Você está indo muito bem, tá bom?”
    - “Obrigada por me contar isso, é importante.”
    - “Se você não souber ou não quiser responder, tudo bem também.”
    - “Pode me contar do seu jeitinho. Não existe resposta errada.”

    🧸 Inicie a conversa com base nesse roteiro:
    1. Oi! Qual é o seu nome? E quantos aninhos você tem?
    2. Sabe me dizer por que está aqui hoje conversando comigo? Alguém te falou o motivo?
    3. Tem algo diferente com você esses dias? Tipo ficar doentinho, sentir dor ou chateado com alguma coisa?
    4. Você já ficou bem dodói? Ou já precisou ir para o médico, tomar remédio ou ficar no hospital?
    5. Alguém já te contou como foi quando você nasceu? Tipo se foi cesárea, parto normal…?
    6. Você come de tudo ou tem comida que você não gosta nem de olhar? Me conta!
    7. Você já tomou vacinas? Aquelas que doem um pouquinho mas ajudam a gente a não ficar doente?
    8. Você lembra quando aprendeu a andar ou falar? Alguém te contou ou você lembra?
    9. Você vai pra escola ou creche? Gosta de ir? O que mais gosta de fazer lá?
    10. Como tá seu coraçãozinho hoje? Tá tranquilo, feliz ou meio apertado?

    🎯 Seu objetivo final é:
    - Criar vínculo afetivo com a criança.
    - Coletar informações sobre aspectos ${foco} (e outros, se surgirem).
    - Nunca diagnostique. Apenas ouça, acolha e registre.
    - Ao final, gere um resumo compreensível e estruturado para o profissional de saúde, com base no que a criança relatou.
    `;
    console.log("🚀 ~ startChat ~ systemPrompt:", systemPrompt)
    
    try {
        const responseMessage = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: 'Envie a primeira mensagem, o paciente acabou de chegar, cumprimente-o e de as boas vindas e pergunte como ele está.' },
            ]
            },
            {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            }
        );

        const reply = responseMessage.data.choices[0].message.content;
        console.log("🚀 ~ startChat ~ reply:", reply)

        // Gravar reply no history da consutla
        const responses = await generateOptions(reply);
        

            return { reply, choices: responses };
    } catch (error) {
        console.log("🚀 ~ startChat ~ error:", error)
    }
};

export const sendMessage = async (history, message) => {
    try {
        const messages = [
            ...history,
            { role: 'user', content: message.toString() }
        ]
        console.log("🚀 ~ sendMessage ~ messages:", messages)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      console.log("🚀 ~ sendMessage ~ reply:", reply)
    } catch (err) {
      console.error('Erro ao chamar OpenAI', err);
    }
};

const generateOptions = async (originalMessage) => {
    try {
    const responseChoices = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-4o',
            messages: [
            {
                role: 'user',
                content: `Considere a seguinte resposta do psicólogo: "${originalMessage}".
                    Gere 4 opções de resposta possíveis para a criança, em linguagem simples e amigável.
                    Elas podem ser positivas ou negativas, dependendo do contexto.
                    Adicione emoji em todas elas
                `
            }
            ],
            functions: functions,
            function_call: { name: "suggest_patient_responses" }
        },
        {
            headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
            },
        }
        );

        const parsedFunctionCall = JSON.parse(responseChoices.data.choices[0].message.function_call.arguments);
        return parsedFunctionCall.responses
    } catch (error) {
        console.log("🚀 ~ generateOptions ~ error:", error)
    }
}
