/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
    describe('Validations', () => {
      it('requires `name` to not be an empty string', async () => {
        const user = User.build({
          firstName: ''
        });

        it('require "firstName"', async() => {
        const user = User.build({
          firstName: ''
        })
        try{
          user.validate()
          throw Error('validation was successful, but should have failed if first name is an empty string')
        } catch(error) {
            expect(error.message).to.contain('validation error')
        }
      })

    });

  // describe('instanceMethods', () => {
  //   describe('correctPassword', () => {
  //     let cody

  //     beforeEach(async () => {
  //       cody = await User.create({
  //         email: 'cody@puppybook.com',
  //         password: 'bones'
  //       })
  //     })

  //     it('returns true if the password is correct', () => {
  //       expect(cody.correctPassword('bones')).to.be.equal(true)
  //     })

  //     it('returns false if the password is incorrect', () => {
  //       expect(cody.correctPassword('bonez')).to.be.equal(false)
  //     })
  //   }) // end describe('correctPassword')
  // }) // end describe('instanceMethods')
}) // end describe('User model')
