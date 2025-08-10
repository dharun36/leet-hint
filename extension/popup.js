document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  function addMessage(text, sender, isLoading = false) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;

    // Avatar
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "🧑" : "🤖";

    // Message bubble
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    if (isLoading) {
      bubble.innerHTML = '<span class="loader"></span>';
    } else {
      bubble.textContent = text;
    }

    // Timestamp
    const time = document.createElement("span");
    time.className = "timestamp";
    const now = new Date();
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (sender === "user") {
      div.appendChild(time);
      div.appendChild(bubble);
      div.appendChild(avatar);
    } else {
      div.appendChild(avatar);
      div.appendChild(bubble);
      div.appendChild(time);
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
  }

  function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText && !document.activeElement.classList.contains('ai')) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => document.title
        },
        async (results) => {
          const title = results[0].result;
          const prompt = userText
            ? `Question: ${userText}\nContext: ${title}`
            : `Give step-by-step hints to solve the LeetCode problem: '${title}'. Don't give the full solution.`;

          addMessage(userText || "Get AI Hint", "user");
          userInput.value = "";

          // Show loading spinner
          const loadingDiv = addMessage("", "ai", true);

          try {
            const response = await fetch("http://127.0.0.1:5000/get-hint", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: prompt })
            });
            const data = await response.json();
            loadingDiv.remove();
            console.log("AI Response:", data.hint); // <-- See the full response in the console

            // Example: Check if the response contains a code block
            if (data.hint.includes("```")) {
              addMessage("⚠️ The response contains code. Please review carefully.", "ai");
            }

            addMessage(data.hint, "ai");
          } catch (error) {
            loadingDiv.remove();
            addMessage("❌ Failed to fetch hint. Make sure the backend is running.", "ai");
          }
        }
      );
    });
  }

  document.getElementById("getHint").addEventListener("click", sendMessage);

  userInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  document.getElementById("openSolution").addEventListener("click", async function() {
    // Get the active tab's URL
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('https://leetcode.com/problems/')) {
      const problemSlug = tab.url.split('https://leetcode.com/problems/')[1].split('/')[0];
      const solutionUrl = `https://algonotebook.vercel.app/leetcode/${problemSlug}`;
      chrome.windows.create({
        url: solutionUrl,
        type: 'popup',
        width: 800,
        height: screen.height,
        left: screen.width - 800,
        top: 0
      });
    } else {
      alert("Please open a LeetCode problem page.");
    }
  });
});