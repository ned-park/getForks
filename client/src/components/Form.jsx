export default function RecipeForm({
  formData,
  formItems,
  submitText,
  handleChange,
  handleClick,
}) {
  const styles = {
    input:
      "bg-secondary text-secondary p-1 px-2 rounded shadow shadow-gray-500 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
    textarea:
      "bg-secondary text-secondary p-1 px-2 rounded shadow shadow-gray-500 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
  };

  const generateElement = (
    elementType,
    type,
    name,
    placeholder,
    required,
    onChange
  ) => {
    if (elementType === "input") {
      return (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={
            type !== "submit" && type !== "file" && formData[name]
              ? formData[name]
              : placeholder + `${!required ? " (optional)" : ""}`
          }
          onChange={type !== "submit" ? onChange : null}
          value={
            type !== "submit" && type !== "file" ? formData[name] : undefined
          }
          required={required}
          className={styles[elementType]}
        />
      );
    } else if (elementType === "textarea") {
      return (
        <textarea
          type={type}
          name={name}
          id={name}
          placeholder={
            type === "text" && formData[name]
              ? formData[name]
              : placeholder + `${!required ? " (optional)" : ""}`
          }
          onChange={type !== "submit" ? onChange : null}
          value={type === "text" ? formData[name] : null}
          required={required}
          className={styles[elementType]}
        />
      );
    }

    return <></>;
  };

  return (
    <form
      onSubmit={handleClick}
      className="bg-tertiary text-tertiary shadow-md shadow-gray-400 rounded px-8 pt-6 pb-8 mb-4"
    >
      {formItems.map((item) => (
        <div key={item.name} className="mb-6">
          <label htmlFor={item.name} className="block text-sm font-bold mb-2">
            {item.placeholder[0].toUpperCase() +
              item.placeholder.slice(1).toLowerCase()}
          </label>
          {generateElement(
            item.elementType,
            item.type,
            item.name,
            item.placeholder,
            item.required,
            handleChange,
            handleClick
          )}
        </div>
      ))}
      <div className="w-full flex justify-center">
        <button className="mx-auto bg-secondary text-secondary rounded px-5 py-2 shadow shadow-gray-500 border border-gray-200 ">
          {submitText}
        </button>
      </div>
    </form>
  );
}
