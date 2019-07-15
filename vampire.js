/*
 * Who is a vampire's creator?
 * How many vampires has a vampire created?
 * How many vampires away from the original vampire is a vampire?
 * Who is the more sennior vampire out of the two vampires? (Who is closer to the original vampire)
 * Who is the closest common ancestor of two vampires?
 */

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let vampire = this;
    while (vampire.creator) {
      vampire = vampire.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  // After much frustration, I found an implementation in C which allows for quick LCA comparison.
  // However, I was not sure whether it would work with a non-binary tree. After implementing the function, I don't
  // see why it wouldn't work.
  // - create path for given vampire and current vampire (this)
  // - reverse both paths
  // - start from 0 and traverse both paths simultaneously
  // - if the paths split, we can return the node that came right before the split: this is the LCA
  // SOURCE: https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/
  closestCommonAncestor(vampire) {
    let current = this;
    let currentPath = [];
    let vampirePath = [];

    while (current) {
      currentPath.push(current);
      current = current.creator;
    }
    currentPath.reverse();

    while (vampire) {
      vampirePath.push(vampire);
      vampire = vampire.creator;
    }
    vampirePath.reverse();

    let i = 0;
    for (i; i < currentPath.length && i < vampirePath.length; i++) {
      if (currentPath[i].name !== vampirePath[i].name) {
        break;
      }
    }
    return currentPath[i - 1];
  }

}

module.exports = Vampire;