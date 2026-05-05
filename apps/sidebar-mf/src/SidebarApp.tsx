const chats = ['System design notes', 'Refactor API handlers', 'Auth strategy brainstorm'];
export default function SidebarApp(){
  return <div className="side"><button className="new">+ New Chat</button><h3>Recent</h3><ul>{chats.map(c=> <li key={c}>{c}</li>)}</ul></div>
}
