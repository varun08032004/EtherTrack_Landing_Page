export function parseMarkdown(md) {
  const lines = md.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeContent = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${Date.now()}-${Math.random()}`} className="legal-list">
          {listBuffer.map((item, i) => (
            <li key={i} className="legal-list-item">{item}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushCode = () => {
    if (codeContent.length > 0) {
      elements.push(
        <pre key={`code-${Date.now()}-${Math.random()}`} className="legal-code-block">
          <code>{codeContent.join("\n")}</code>
        </pre>
      );
      codeContent = [];
      inCodeBlock = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    if (line.startsWith("# ")) {
      flushList();
      elements.push(<h1 key={`h1-${Date.now()}-${Math.random()}`} className="legal-h1">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${Date.now()}-${Math.random()}`} className="legal-h2">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={`h3-${Date.now()}-${Math.random()}`} className="legal-h3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listBuffer.push(line.slice(2));
    } else if (line.match(/^\d+\.\s/)) {
      listBuffer.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.trim() === "") {
      flushList();
      elements.push(<div key={`spacer-${Date.now()}-${Math.random()}`} className="legal-spacer" />);
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      flushList();
      elements.push(<p key={`bold-${Date.now()}-${Math.random()}`} className="legal-bold">{line}</p>);
    } else if (line.startsWith("---")) {
      flushList();
      elements.push(<hr key={`hr-${Date.now()}-${Math.random()}`} className="legal-hr" />);
    } else {
      flushList();
      elements.push(
        <p key={`p-${Date.now()}-${Math.random()}`} className="legal-p">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  flushList();
  flushCode();

  return elements;
}

function parseInlineMarkdown(text) {
  const parts = [];
  let remaining = text;
  let lastIndex = 0;

  const boldRegex = /\*\*(.+?)\*\*/g;
  const italicRegex = /\*(.+?)\*/g;
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const codeRegex = /`(.+?)`/g;

  const matches = [];
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    matches.push({ type: "bold", index: match.index, length: match[0].length, content: match[1] });
  }
  while ((match = italicRegex.exec(text)) !== null) {
    if (!matches.some(m => m.index === match.index && m.type === "bold")) {
      matches.push({ type: "italic", index: match.index, length: match[0].length, content: match[1] });
    }
  }
  while ((match = linkRegex.exec(text)) !== null) {
    matches.push({ type: "link", index: match.index, length: match[0].length, content: match[1], href: match[2] });
  }
  while ((match = codeRegex.exec(text)) !== null) {
    matches.push({ type: "code", index: match.index, length: match[0].length, content: match[1] });
  }

  matches.sort((a, b) => a.index - b.index);

  for (const m of matches) {
    if (m.index > lastIndex) {
      parts.push(remaining.slice(lastIndex, m.index));
    }
    if (m.type === "bold") {
      parts.push(<strong key={`b-${m.index}`}>{m.content}</strong>);
    } else if (m.type === "italic") {
      parts.push(<em key={`i-${m.index}`}>{m.content}</em>);
    } else if (m.type === "link") {
      parts.push(
        <a key={`l-${m.index}`} href={m.href} target="_blank" rel="noopener noreferrer" className="legal-link">
          {m.content}
        </a>
      );
    } else if (m.type === "code") {
      parts.push(<code key={`c-${m.index}`}>{m.content}</code>);
    }
    lastIndex = m.index + m.length;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}