import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyByFTCGDbUVfUrXz6nfTBx_v2Uebg-FBAY");

// Format the AI response with proper structure
const formatResponse = (text) => {
  // First, clean any raw HTML or formatting tags that might appear in the AI response
  let formattedText = text.replace(/\* ai-[a-z-]+>/g, "");
  formattedText = formattedText.replace(/ai-[a-z-]+>/g, "");
  
  // Remove any asterisks and other special characters
  formattedText = formattedText.replace(/[\*\#\~\_\`]/g, "");
  
  // Replace newlines with <br> tags
  formattedText = formattedText.replace(/\n/g, "<br>");

  // Format headings (lines ending with ':')
  formattedText = formattedText.replace(
    /([^>]+?):\s*<br>/g,
    '<h3 class="ai-heading">$1:</h3>'
  );

  // Format lists
  formattedText = formattedText.replace(
    /- ([^<]+)/g,
    '<li class="ai-list-item">$1</li>'
  );

  // Wrap lists in ul tags
  formattedText = formattedText.replace(
    /((?:<li[^>]*>.*?<\/li>\s*)+)/g,
    '<ul class="ai-list">$1</ul>'
  );

  // Format key statistics or numbers
  formattedText = formattedText.replace(
    /(\d+%|\d+\s*-\s*\d+)/g,
    '<span class="ai-stat">$1</span>'
  );

  // Format team names in quotes
  formattedText = formattedText.replace(
    /"([^"]+)"/g,
    '<span class="ai-team">$1</span>'
  );

  // Fix common formatting issues
  formattedText = formattedText.replace(/(\d+)-(\d+)/g, '<span class="ai-stat">$1-$2</span>');
  
  // Add paragraph tags for better structure
  formattedText = formattedText.replace(/(?:<br>){2,}/g, "</p><p>");
  formattedText = "<p>" + formattedText + "</p>";
  
  // Ensure clean output - remove any double HTML tags
  formattedText = formattedText.replace(/<span class="ai-stat"><span class="ai-stat">/g, '<span class="ai-stat">');
  formattedText = formattedText.replace(/<\/span><\/span>/g, '</span>');

  // Limit response length
  if (formattedText.length > 1500) {
    formattedText = formattedText.substring(0, 1500) + "...</p>";
  }

  return `<div class="ai-response">${formattedText}</div>`;
};

// Create a chat model instance
export const getGeminiChat = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a football match analysis expert who provides comprehensive yet concise match information. For match analyses, include: final score, goal scorers with minute of goals, possession stats, shots on/off target, passes completed, key passes, corners, expected goals (xG), cards issued, team formations, notable tactical shifts, managerial decisions, standout players with specific actions, substitutions with impact, referee decisions, VAR interventions, injuries, notable saves, defensive actions, attacking highlights, match atmosphere, stadium information, attendance figures, weather conditions, league/competition context, and team standings before and after the match. Keep responses under 200 words, use simple language without special characters, formatting marks or HTML tags. Present information in a direct, factual manner using plain text only. Also handle general conversation questions with friendly, helpful responses.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand my role as a football match analysis expert. I'll provide comprehensive match information covering all requested details: scores, goal scorers, match statistics, tactical elements, player performances, match events, context information, and post-match impacts. I'll keep responses under 200 words using simple, direct language without special characters, formatting marks or HTML tags. For general questions, I'll respond in a friendly, helpful manner. I'm ready to provide concise yet detailed football analysis.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Please remember this match information for future reference: Liverpool defeated Manchester City 2-1 at Anfield with 52,331 in attendance. Salah (43') and Diaz (67') scored for Liverpool, while Haaland (71') pulled one back for City. Liverpool lined up in a 4-3-3 with Alisson making 5 key saves. City used a 4-2-3-1 formation. Liverpool held 53% possession to City's 47%. Liverpool had 12 shots (5 on target) with an xG of 1.8, while City had 9 shots (3 on target) with an xG of 1.2. The referee issued 3 yellow cards (2 to Liverpool). The match was played in light rain with temperatures around 12°C. With this win, Liverpool moved to 2nd in the Premier League table, 3 points behind Arsenal, while City dropped to 3rd.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I've recorded the match information: Liverpool beat Manchester City 2-1 at Anfield before 52,331 fans. Salah scored at 43 minutes and Diaz at 67 minutes for Liverpool, with Haaland responding at 71 minutes for City. Liverpool used a 4-3-3 formation with Alisson making 5 crucial saves, while City deployed a 4-2-3-1. Liverpool had the edge in possession (53% vs 47%) and shots (12 vs 9, with 5 vs 3 on target). Liverpool's xG was 1.8 compared to City's 1.2. The referee showed 3 yellow cards, 2 to Liverpool players. The match was played in light rain at 12°C. The win moved Liverpool to 2nd in the Premier League, 3 points behind Arsenal, with City falling to 3rd place. I'll reference this information when answering questions about this match.",
          },
        ],
      },
    ],
  });

  return chat;
};

// Helper function to handle chat interactions
export const sendMessageToGemini = async (chat, message) => {
  try {
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    return formatResponse(response.text());
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return formatResponse(
      "I apologize, but I'm having trouble processing your request at the moment. Please try again."
    );
  }
};
