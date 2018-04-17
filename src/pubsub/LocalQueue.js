// @flow
import queue from 'async/queue';

/**
 * Async queue for inmemory messaging system
 */
class LocalQueue {
  constructor(worker) {
    this.queue = queue(worker, 1);
    this.queue.drain = () => {
      this.count = 0;
      console.info('Finished all the existing tasks');
    };
  }
  /**
   * Fix any type!
   * @param task
   * @param {Function} callback
   */
  push(task, callback) {
    // Inc number of tasks
    this.count += 1;
    console.log(`Received a new task: number of tasks is ${this.count}`);
    this.queue.push(task, callback);
  }
}

export default LocalQueue;
