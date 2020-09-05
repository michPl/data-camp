'use strict';

module.exports = class Robot {
  /**
   *
   * @param {string} input
   * @returns {[number, number]}
   */
  _findStartPosition(input) {
    return input.split(' ').slice(0, 2).map(Number);
  }

  /**
   *
   * @param {string} input
   * @returns {'NORTH' | 'EAST' | 'SOUTH' | 'WEST'}
   */
  _findStartDirection(input) {
    return input.split(' ')[2];
  }

  /**
   *
   * @param {string} input
   * @returns {string[]}
   */
  _getCommands(input) {
    return input.split(' ')[3].split('');
  }

  /**
   *
   * @param {'NORTH' | 'EAST' | 'SOUTH' | 'WEST'} currentDirection
   * @param {'R' | 'L' | 'A'} command
   * @returns {'NORTH' | 'EAST' | 'SOUTH' | 'WEST'}
   */
  _getDirection(currentDirection, command) {
    if (command === 'A') return currentDirection;

    switch (currentDirection) {
    case 'NORTH': return command === 'R' ? 'EAST' : 'WEST';
    case 'EAST': return command === 'R' ? 'SOUTH' : 'NORTH';
    case 'SOUTH': return command === 'R' ? 'WEST' : 'EAST';
    case 'WEST': return command === 'R' ? 'NORTH' : 'SOUTH';
    }
  }

  /**
   *
   * @param {'NORTH' | 'EAST' | 'SOUTH' | 'WEST'} direction
   * @param {number[]} position
   * @returns {[number, number]}
   */
  _makeStep(direction, [x, y]) {
    switch (direction) {
    case 'NORTH': return [x, y + 1];
    case 'EAST': return [x + 1, y];
    case 'SOUTH': return [x, y - 1];
    case 'WEST': return [x - 1, y];
    }
  }

  /**
   *
   * @param {'R' | 'L' | 'A'} command
   */
  _isTurn(command) {
    return command !== 'A';
  }

  /**
   *
   * @param {string} input
   * @returns {string}
   */
  execute(input) {
    let position = this._findStartPosition(input);
    let direction = this._findStartDirection(input);
    const commands = this._getCommands(input);

    for (let i = 0; i < commands.length; i++) {
      this._isTurn(commands[i]) ?
        direction = this._getDirection(direction, commands[i]) :
        position = this._makeStep(direction, position);
    }

    return `${position.join(' ')} ${direction}`;
  }
};
