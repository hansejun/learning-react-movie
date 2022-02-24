import { useRef, useState, useEffect } from "react";

export const FileInput = ({ name, value, onChange, initialPreview = "" }) => {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  const handleFileClear = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    setPreview("");
    onChange(name, null);
  };
  useEffect(() => {
    if (!value) return;
    const newPreview = URL.createObjectURL(value);
    setPreview(newPreview);
    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(value);
    };
  }, [value, initialPreview]);
  return (
    <div>
      {preview && (
        <img
          src={preview}
          alt="미리보기 이미지"
          className="reviewListItem-img"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleFileClear}>X</button>}
    </div>
  );
};

export default FileInput;
