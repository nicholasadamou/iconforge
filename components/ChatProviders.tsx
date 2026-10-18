import Image from 'next/image';

export default function ChatProviders({ content }: { content: string }) {
  const prompt = encodeURIComponent(
    `Help me use IconForge based on this documentation:\n\n${content}`,
  );
  const providers = [
    ['ChatGPT', 'chatgpt', `https://chatgpt.com/?prompt=${prompt}`],
    ['Claude', 'claude', `https://claude.ai/new?q=${prompt}`],
    ['v0', 'v0', `https://v0.app/?q=${prompt}`],
    ['T3 Chat', 't3', `https://t3.chat/new?q=${prompt}`],
    ['Scira', 'scira', `https://scira.ai/?q=${prompt}`],
    ['Cursor', 'cursor', `https://cursor.com/link/prompt?text=${prompt}`],
  ];
  return (
    <details className="chat-disclosure">
      <summary>
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4h16v13H9l-5 4z" />
        </svg>
        Open in chat{' '}
        <span className="action-chevron" aria-hidden="true">
          ⌄
        </span>
      </summary>
      <div className="chat-providers">
        {providers.map(([name, icon, href]) => (
          <a key={name} href={href} target="_blank" rel="noreferrer">
            <Image src={`/brands/chat/${icon}.svg`} width={19} height={19} alt="" />
            <span>{name}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 3h7v7m0-7L10 14M10 4H3v17h17v-7" />
            </svg>
          </a>
        ))}
      </div>
      <p className="chat-note">Opens with this page’s documentation in the prompt.</p>
    </details>
  );
}
