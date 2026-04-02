// ============================================================
// Claude.ai Conversation Tree Extractor
// ============================================================
// USAGE:
// 1. Open claude.ai in your browser and navigate to a conversation
// 2. Open DevTools (F12 or Cmd+Shift+J)
// 3. Paste this entire script into the Console tab and press Enter
// 4. It will fetch the full tree (all branches) and download as JSON
// ============================================================

(async () => {
  // Validate we're on claude.ai
  if (window.location.hostname !== 'claude.ai') {
    console.error('This script must be run on claude.ai');
    return;
  }

  // Get chat ID from URL
  const chatId = window.location.pathname.split('/').pop();
  if (!chatId || chatId.length < 30) {
    console.error('Navigate to a conversation first. URL should look like: claude.ai/chat/<uuid>');
    return;
  }

  // Get organization ID
  console.log('Getting organization ID...');
  let orgId;
  try {
    const orgResp = await fetch('https://claude.ai/api/organizations', { credentials: 'include' });
    const orgs = await orgResp.json();
    orgId = orgs[0]?.uuid;
    if (!orgId) throw new Error('No org found');
  } catch (e) {
    console.error('Failed to get org ID. Make sure you are logged in.', e);
    return;
  }

  // Fetch the full conversation tree
  console.log(`Fetching conversation tree for ${chatId}...`);
  let tree;
  try {
    const resp = await fetch(
      `https://claude.ai/api/organizations/${orgId}/chat_conversations/${chatId}?tree=True&rendering_mode=messages&render_all_tools=true`,
      { credentials: 'include' }
    );
    tree = await resp.json();
  } catch (e) {
    console.error('Failed to fetch conversation tree:', e);
    return;
  }

  // Analyze branches
  const messages = tree.chat_messages || [];
  const childrenMap = {};
  messages.forEach(msg => {
    const parent = msg.parent_message_uuid || 'root';
    if (!childrenMap[parent]) childrenMap[parent] = [];
    childrenMap[parent].push(msg.uuid);
  });

  const branchPoints = Object.entries(childrenMap).filter(([, c]) => c.length > 1);
  console.log(`"${tree.name || 'Untitled'}"`);
  console.log(`${messages.length} messages, ${branchPoints.length} branch points`);

  // Download
  const blob = new Blob([JSON.stringify(tree, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `claude-chat-tree-${chatId}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`Downloaded: claude-chat-tree-${chatId}.json`);
})();
