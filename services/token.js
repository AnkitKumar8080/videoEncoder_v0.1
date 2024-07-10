const generateToken = () => {
  const rand = () => {
    return Math.random().toString(36).substring(2);
  };

  return rand() + rand() + rand() + "-" + rand() + rand() + rand();
};

export { generateToken };
