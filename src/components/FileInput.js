import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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
    <div className="reviewListItem-fileImg">
      {preview && (
        <img
          src={preview}
          alt="미리보기 이미지"
          className="reviewListItem-img"
          width="200px"
          height="100%"
        />
      )}
      <label className="reviewListItem-fileBtn" for="input-file">
        {preview ? (
          <FontAwesomeIcon icon={faImage} className="none" />
        ) : (
          <FontAwesomeIcon icon={faImage} className="fileBtn-img" />
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        id="input-file"
        style={{ display: "none" }}
      />
      {value && <button onClick={handleFileClear}>X</button>}
    </div>
  );
};

export default FileInput;
