const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User test specs', () => {
  describe('User model', () => {
    describe('Validations', () => {
      it('requires `firstName`', async () => {
        const testUser1 = User.build({
          firstName: '',
          lastName: 'defined',
          email: 'emailexists@email.com'
        });

        try {
          await testUser1.validate();
          throw Error(
            'validation was successful but should have failed without `firstName`'
          );
        } catch (err) {
          expect(err.message).to.contain('failed');
        }
      });

      it('requires `firstName` to not be an empty string', async () => {
        const testUser2 = User.build({
          firstName: '',
          lastName: 'defined',
          email: 'emailexists@email.com'
        });

        try {
          await testUser2.validate();
          throw Error(
            'validation was successful but should have failed if firstName is an empty string'
          );
        } catch (err) {
          expect(err.message).to.contain('failed');
          /* handle error */
        }
      });
    });
  });
});
