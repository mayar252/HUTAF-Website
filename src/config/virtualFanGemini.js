import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyByFTCGDbUVfUrXz6nfTBx_v2Uebg-FBAY");

// Football tactics data store
const footballTactics = {
  formations: {
    "3-4-3": {
      strengths: ["Width in attack", "Strong central midfield presence", "Triangular passing options"],
      weaknesses: ["Vulnerable to counter-attacks", "Requires high stamina from wing-backs", "Needs coordinated pressing"],
      idealFor: ["Possession-based play", "Teams with strong wing-backs", "Technical midfielders"]
    },
    "3-5-2": {
      strengths: ["Midfield control", "Wing-back width", "Two striker partnership"],
      weaknesses: ["Requires disciplined wing-backs", "Can be exposed on flanks", "Needs technically skilled center-backs"],
      idealFor: ["Counter-attacking", "Teams with strong striker partnerships", "Defensive solidity with attacking options"]
    },
    "4-3-3": {
      strengths: ["Balanced attack and defense", "Width in attack", "Pressing opportunities"],
      weaknesses: ["Can be overrun in midfield", "Requires disciplined wingers", "Depends on strong central defender pairing"],
      idealFor: ["High-pressing teams", "Teams with technical wingers", "Balanced approach"]
    },
    "4-4-2": {
      strengths: ["Defensive stability", "Clear roles", "Strong counter-attacking potential"],
      weaknesses: ["Can lose midfield battles", "Limited creative options", "Needs disciplined wide midfielders"],
      idealFor: ["Direct play", "Teams with strong striker partnerships", "Organized defensive units"]
    },
    "4-2-3-1": {
      strengths: ["Defensive midfield shield", "Single striker support", "Balanced width and central play"],
      weaknesses: ["Isolated striker risk", "Requires strong number 10", "Transition speed is crucial"],
      idealFor: ["Counter-pressing teams", "Teams with a strong creative midfielder", "Balanced approach"]
    }
  },
  tactics: {
    "Gegenpressing": {
      description: "Intense counter-pressing immediately after losing possession",
      keyPrinciples: ["Immediate pressure after losing the ball", "Compact shape", "Coordinated team pressing", "Quick transitions"]
    },
    "Tiki-Taka": {
      description: "Possession-based approach with short passing and movement",
      keyPrinciples: ["Patient build-up", "Positional play", "Technical ability prioritized", "Creating numerical advantages"]
    },
    "Counter-Attack": {
      description: "Defensive solidity with rapid attacking transitions",
      keyPrinciples: ["Compact defensive shape", "Quick vertical transitions", "Direct passing", "Exploiting space behind defense"]
    },
    "Wing Play": {
      description: "Focuses on creating and exploiting width",
      keyPrinciples: ["Wide positioning of attackers", "Crosses into the box", "Overlapping runs", "Stretching opposition defense"]
    }
  }
};

// Enhanced response formatter for football coach style
const formatCoachResponse = (text) => {
  // Clean up any special characters that might interfere with formatting
  let formattedText = text.replace(/[*>]/g, "");
  
  // Replace newlines with proper HTML breaks
  formattedText = formattedText.replace(/\n/g, "<br>");
  
  // Format tactical sections (lines ending with ':')
  formattedText = formattedText.replace(
    /([^>]+?):\s*<br>/g,
    '<h3 class="coach-heading">$1</h3>'
  );
  
  // Format tactical points
  formattedText = formattedText.replace(
    /- ([^<]+)/g,
    '<div class="coach-point">• $1</div>'
  );
  
  // Format formations and tactical terms
  formattedText = formattedText.replace(
    /\b(\d-\d-\d|\d-\d-\d-\d)\b/g,
    '<span class="coach-formation">$1</span>'
  );
  
  // Format key statistics or percentages
  formattedText = formattedText.replace(
    /(\d+%|\d+\s*-\s*\d+)/g,
    '<span class="coach-stat">$1</span>'
  );
  
  // Format player positions
  const positions = ["striker", "forward", "midfielder", "defender", "goalkeeper", "winger", "center-back", "full-back", "wing-back"];
  positions.forEach(pos => {
    const regex = new RegExp(`\\b${pos}s?\\b`, "gi");
    formattedText = formattedText.replace(regex, `<span class="coach-position">$&</span>`);
  });
  
  // Add paragraph structure
  formattedText = formattedText.replace(/(?:<br>){2,}/g, "</p><p>");
  formattedText = "<p>" + formattedText + "</p>";
  
  return `<div class="coach-analysis">${formattedText}</div>`;
};

// Create a chat model instance with football coach persona
export const getFootballCoachChat = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const coachPrompt = `
    You are an elite football coach with expertise in tactical analysis and player development. 
    You provide clear, concise, and actionable advice on football tactics, formations, and strategy.
    
    When analyzing formations:
    - Compare their strengths and weaknesses
    - Explain when to use them based on opponent style
    - Suggest player roles and responsibilities
    - Provide training drills to improve the execution
    
    When discussing match tactics:
    - Focus on key tactical battles
    - Give specific, actionable advice
    - Use clear football terminology
    - Analyze space utilization and pressing triggers
    
    Your responses should be structured with clear sections and concise points.
    Avoid using special characters like asterisks or markdown formatting.
    Be direct and authoritative like an experienced coach giving a team talk.
  `;
  
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: coachPrompt }]
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand my role as an elite football coach specializing in tactical analysis and player development. I'll provide clear, actionable advice drawing from my tactical knowledge and coaching experience. I'll structure my responses with clear sections and focus on practical applications of football theory. I'll analyze formations, match tactics, and development strategies with authority and precision."
          }
        ]
      }
    ]
  });
  
  return chat;
};

// Enhanced helper function to handle chat interactions with tactical context
export const sendMessageToFootballCoach = async (chat, message) => {
  try {
    // Enhance the user message with tactical context if applicable
    let enhancedMessage = message;
    
    // Check if the message mentions specific formations
    const formationRegex = /\b(\d-\d-\d|\d-\d-\d-\d)\b/g;
    const mentionedFormations = message.match(formationRegex);
    
    if (mentionedFormations && mentionedFormations.length > 0) {
      // Add tactical context about the formations
      let formationContext = "When analyzing these formations, consider their key characteristics:\n";
      
      mentionedFormations.forEach(formation => {
        // Check if we have data on this formation
        const normalizedFormation = formation.trim();
        if (footballTactics.formations[normalizedFormation]) {
          const data = footballTactics.formations[normalizedFormation];
          formationContext += `\nFor ${normalizedFormation}:\n`;
          formationContext += `- Strengths: ${data.strengths.join(', ')}\n`;
          formationContext += `- Best used when: ${data.idealFor.join(', ')}\n`;
        }
      });
      
      // Add the context but keep it invisible to the user by adding it at the end
      enhancedMessage += "\n\n[Tactical Context: " + formationContext + "]";
    }
    
    const result = await chat.sendMessage([{ text: enhancedMessage }]);
    const response = await result.response;
    return formatCoachResponse(response.text());
  } catch (error) {
    console.error("Error sending message to Football Coach:", error);
    return formatCoachResponse(
      "I'm having trouble analyzing that tactical scenario right now. Let's reset and try approaching it differently."
    );
  }
};

// Create a Virtual Fan chat model instance
export const getVirtualFanChat = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const virtualFanPrompt = `
    You are a passionate virtual football fan and tactical expert.
    You provide enthusiastic advice on football tactics, formations, and strategies.
    
    When discussing football:
    - Share insights on formations and tactical approaches
    - Provide fan-oriented perspectives on matchups
    - Offer enthusiastic opinions on team strategies
    - Discuss player roles and team dynamics
    
    Your responses should be engaging, informative, and reflect a deep love for the game.
    Use clear football terminology while remaining accessible to fans.
  `;
  
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: virtualFanPrompt }]
      },
      {
        role: "model",
        parts: [
          {
            text: "I'm ready to talk football! As your virtual fan and tactical expert, I'll provide enthusiastic insights on formations, tactics, and all aspects of the beautiful game. Whether you want to discuss strategies, player roles, or match analysis, I'm here with fan-focused perspectives and tactical knowledge. What football topic would you like to explore today?"
          }
        ]
      }
    ]
  });
  
  return chat;
};

// Function to handle sending messages to the virtual fan
export const sendMessageToVirtualFan = async (chat, message) => {
  try {
    // Enhance the user message with tactical context if applicable
    let enhancedMessage = message;
    
    // Check if the message mentions specific formations
    const formationRegex = /\b(\d-\d-\d|\d-\d-\d-\d)\b/g;
    const mentionedFormations = message.match(formationRegex);
    
    if (mentionedFormations && mentionedFormations.length > 0) {
      // Add tactical context about the formations
      let formationContext = "Consider these formations in your response:\n";
      
      mentionedFormations.forEach(formation => {
        // Check if we have data on this formation
        const normalizedFormation = formation.trim();
        if (footballTactics.formations[normalizedFormation]) {
          const data = footballTactics.formations[normalizedFormation];
          formationContext += `\nFor ${normalizedFormation}:\n`;
          formationContext += `- Strengths: ${data.strengths.join(', ')}\n`;
          formationContext += `- Best used when: ${data.idealFor.join(', ')}\n`;
        }
      });
      
      // Add the context but keep it invisible to the user
      enhancedMessage += "\n\n[Context: " + formationContext + "]";
    }
    
    const result = await chat.sendMessage([{ text: enhancedMessage }]);
    const response = await result.response;
    return formatCoachResponse(response.text());
  } catch (error) {
    console.error("Error sending message to Virtual Fan:", error);
    return formatCoachResponse(
      "I'm having trouble analyzing that right now. Let's try a different football topic!"
    );
  }
};
