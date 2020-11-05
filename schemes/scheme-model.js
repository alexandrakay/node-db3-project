// scheme-model
const db = require('../data./db-config.js')

module.exports = {
    find() {
        return db('schemes')
    },

    findById(id) {
        return db('schemes')
        .where({ id: id })
        .first()
    },

    findSteps(id) {
        return db('steps')
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .where({scheme_id: id})
        .orderBy('steps.step_number')
    },

    add(scheme) {
        return db('schemes')
        .insert(scheme)
    },
    update(changes, id) {
        return db ('schemes')
        .where({id: id})
        .update(changes)
        .then(() => {
            return findById(id)
        })
        },
    remove(id) {
        return db("schemes")
        .where({ id })
        .del();   
    }      
}