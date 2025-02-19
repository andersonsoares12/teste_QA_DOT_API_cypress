import 'cypress-plugin-api'
describe('GET Posts', () => {
  it('deve buscar todas as postagens', () => {
    cy.api('GET', 'https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
  });
});


//função que faz a gração dos titulos aleaorios
function generateRandomTitle(length = 10) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

function generateRandomBody(length = 50) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

describe.only('POST Posts', () => {
  it('Deve criar uma nova postagem', () => {
    const postData = {
      title: generateRandomTitle(),
      body: generateRandomBody(),
      userId: Math.floor(Math.random() * 10) + 1
    };

    cy.api('POST', 'https://jsonplaceholder.typicode.com/posts', postData)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        cy.log('New post ID:', response.body.id);
      });
  });


  describe('UPDATE Post Title', () => {
    it('Deve atualizar o título de uma postagem existente', () => {
      const updatedTitle = 'Teste API Cypress';
      const updatedBody = 'Anderson Soares';
      
  
      cy.api('PUT', 'https://jsonplaceholder.typicode.com/posts/2', {
        id: 2,
        title: updatedTitle,
        body: updatedBody, 
        userId: 1
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 2);
          expect(response.body.title).to.eq(updatedTitle);
          cy.log('Updated post title:', response.body.title);
        });
    });

// A resposta pode não conter o corpo JSON, mas podemos validar o status como 200 OK
    describe.only('DELETE Post', () => {
      it('Deve excluir uma postagem existente', () => {
        cy.api('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
          .then((response) => {
            expect(response.status).to.eq(200);
            
          });
      });
    });


describe('GET Filtered Posts', () => {
  it('Deve buscar postagens para um usuário específico', () => {
    cy.api('GET', 'https://jsonplaceholder.typicode.com/posts?userId=1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // Verifica que todos os posts pertencem ao userId 1
        response.body.forEach(post => {
          expect(post.userId).to.eq(1);
        });
      });
  });
});

describe('GET Post Comments', () => {
  it('Deve buscar comentários para uma postagem específica', () => {
    cy.api('GET', 'https://jsonplaceholder.typicode.com/posts/1/comments')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // Verifica que todos os comentários pertencem ao postId 1
        response.body.forEach(comment => {
          expect(comment.postId).to.eq(1);
        });
      });
  });
});


  });
});
