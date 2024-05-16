import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPass = async (pass) => {

  let error = null;
  let hashed = null;

  try {

    hashed = await bcrypt.hash(pass, saltRounds);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, hashed };

  }
};

export const compareHash = async (passwordNotHashed, passHashed) => {

  let isSame = false;

  try {

    isSame = await bcrypt.compare(passwordNotHashed, passHashed);

  } catch (e) {

    console.log(e.message);

  } finally {

    return isSame;

  }
};
