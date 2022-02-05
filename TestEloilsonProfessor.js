const professores = [
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 6A - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 6B - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 6C - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 6D - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 7A - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 7B - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 7C - 2022',
    role: 'editingteacher'
  },
  {
    username: 'biosheilalima@gmail.com',
    password: '',
    firstname: 'Sheila',
    lastname: 'Franco de Oliveira Lima',
    email: 'biosheilalima@gmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 7D - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 8A - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 8B - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 8C - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 8D - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 9A - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 9B - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 9C - 2022',
    role: 'editingteacher'
  },
  {
    username: 'fabio_b_amaral@hotmail.com',
    password: '',
    firstname: 'PROFESSOR FÁBIO',
    lastname: 'de Barros Amaral',
    email: 'fabio_b_amaral@hotmail.com',
    city: 'VALPARAISO',
    course: 'CORA CORALINA - CIÊNCIAS - 9D - 2022',
    role: 'editingteacher'
  }
]

const result = [];

for (let i = 0; i < professores.length; i += 1) {
  const quantosProfessores = professores.filter((p) => p.username === professores[i].username);

  const resultProfessores = {
    username: professores[i].username,
    password: professores[i].password,
    firstname: professores[i].firstname,
    lastname: professores[i].lastname,
    email: professores[i].email,
    city: professores[i].city,
  };

  i += quantosProfessores.length;

  for (let j = 1; j <= quantosProfessores.length; j += 1) {
    resultProfessores[`course${j}`] = professores[j - 1].course;
  }

  for (let j = 1; j <= quantosProfessores.length; j += 1) {
    resultProfessores[`role${j}`] = professores[j - 1].role;
  }

  result.push(resultProfessores);
}

console.log(JSON.stringify(result));
