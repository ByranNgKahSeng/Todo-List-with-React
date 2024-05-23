// src/components/CKEditorComponent.jsx
import React, { useEffect, useRef } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { styled } from '@mui/system';

const EditorWrapper = styled('div')(({ multiline, maxRows }) => ({
  '.ck-editor__editable_inline': {
    minHeight: multiline ? `${maxRows * 20}px` : 'auto', // Adjust height per row
    maxHeight: multiline ? `${maxRows * 20}px` : 'auto',
    overflowY: multiline ? 'auto' : 'hidden',
  },
}));

const CKEditorComponent = ({ description, setDescription, placeholder, multiline, maxRows }) => {
  const editorRef = useRef();

  useEffect(() => {
    // if (editorRef.current) {
    //   editorRef.current.setData(description || '');
    // }
  }, [description]);

  return (
    <EditorWrapper multiline={multiline} maxRows={maxRows}>
      <CKEditor
        editor={ClassicEditor}
        data={description}
        onReady={(editor) => {
          editorRef.current = editor;
          // Set the placeholder
          editor.editing.view.change((writer) => {
            writer.setAttribute('placeholder', placeholder, editor.editing.view.document.getRoot());
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescription(data);
        }}
        config={{
          placeholder: placeholder || 'Enter your text here...',
        }}
      />
    </EditorWrapper>
  );
};

export default CKEditorComponent;
