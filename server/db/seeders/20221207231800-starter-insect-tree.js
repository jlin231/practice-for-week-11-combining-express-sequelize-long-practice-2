'use strict';

const {Insect} = require('../models');
const {InsectTree} = require('../models');
const {Tree} = require('../models');

const data = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for(let i = 0; i<data.length; i++){
      let insectName = data[i].insect.name; 
      let insect = await Insect.findOne({
        where: {name: insectName}
      })
      let insectId = insect.id;
      for(let j = 0; j<data[i].trees.length; j++){
        let treeName = data[i].trees[j].tree;
        let tree = await Tree.findOne({
          where: {
            tree: treeName
          }
        })
        let treeId = tree.id

        await InsectTree.create({treeId, insectId});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     for(let i = 0; i<data.length; i++){
      let insectName = data[i].insect.name; 
      let insect = await Insect.findOne({
        where: {name: insectName}
      })
      let insectId = insect.id;
      for(let j = 0; j<data[i].trees.length; j++){
        let treeName = data[i].trees[j].tree;
        let tree = await Tree.findOne({
          where: {
            tree: treeName
          }
        })
        let treeId = tree.id

        await InsectTree.destroy({treeId, insectId});
      }
    }
  }
};
