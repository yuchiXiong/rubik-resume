import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['clean']
  ],
};

const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'indent'];

export interface IRichTextEditorProps {
  value: string;
  setValue: (value: string) => void;
}

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ value, setValue }) => {
  return <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
}

export default RichTextEditor;