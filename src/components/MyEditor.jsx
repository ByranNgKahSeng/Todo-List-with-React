import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import './RichEditor.css';

const MyEditor = ({ description, setDescription }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    setDescription(newEditorState.getCurrentContent().getPlainText());
  };


  return (
    <div className="RichEditor-root" style={{background:"#bfe0e2", padding: "15px", border: "1px solid grey"}}>
      <div className="RichEditor-controls">
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-one")}
        >
          H1
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-two")}
        >
          H2
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-three")}
        >
          H3
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-four")}
        >
          H4
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-five")}
        >
          H5
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("header-six")}
        >
          H6
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("blockquote")}
        >
          Blockquote
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("unordered-list-item")}
        >
          UL
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("ordered-list-item")}
        >
          OL
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleBlockType("code-block")}
        >
          Code Block
        </span>
      </div>
      <div className="RichEditor-controls">
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleInlineStyle("BOLD")}
        >
          Bold
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleInlineStyle("ITALIC")}
        >
          Italic
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleInlineStyle("UNDERLINE")}
        >
          Underline
        </span>
        <span
          className="RichEditor-styleButton"
          onClick={() => toggleInlineStyle("CODE")}
        >
          Monospace
        </span>
      </div>
      <div className="RichEditor-editor" onClick={focusEditor} >
        <div className="RichEditor-container" style={{padding:"10px"}}>
            <Editor
            ref={editor}
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Write something!"
            />
        </div>
      </div>
    </div>
  );
};

export default MyEditor;
