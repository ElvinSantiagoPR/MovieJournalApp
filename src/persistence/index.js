import * as memory from './memory';
import * as asyncStorage from './asyncStorage';
import * as sqlite from './sqlite';

export function getPersistenceBackend(type) {
  if (type === 'sqlite') return sqlite;
  if (type === 'asyncStorage') return asyncStorage;
  return memory;
}
