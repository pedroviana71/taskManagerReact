const index = () => {
  return (
    <div>
      <textarea onChange={(e) => setName(e.target.value)} />
      <CirclePicker color={color} onChangeComplete={handleColor} />
      <button onClick={handleSubmit}>Criar categoria</button>
      <button onClick={handleGoBack}>Cancelar</button>
    </div>
  );
};

export default index;
