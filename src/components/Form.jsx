export default function RecipeForm({
  formData,
  formItems,
  handleChange,
  handleClick,
}) {
  const styles = {
    input: "bg-tertiary text-secondary p-1 px-2 rounded",
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
          placeholder={placeholder + `${!required ? " (optional)" : ""}`}
          onChange={type !== "submit" ? onChange : null}
          value={type === "text" ? formData[{ name }] : undefined}
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
          placeholder={placeholder + `${!required ? " (optional)" : ""}`}
          onChange={type !== "submit" ? onChange : null}
          value={type === "text" ? formData[{ name }] : null}
          required={required}
          className={styles[elementType]}
        />
      );
    }

    return <></>;
  };

  return (
    <>
      <section className="shadow-xl mt-24 m-auto container flex flex-col">
        <h2 className="text-xl font-bold text-center">Add Recipe</h2>
        <form onSubmit={handleClick} className="">
          {formItems.map((item) => (
            <div key={item.name} className="flex flex-row gap-4 mb-4">
              <label htmlFor={item.name}>{item.placeholder}</label>
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
          <button>Create</button>
        </form>
      </section>
    </>
  );
}
