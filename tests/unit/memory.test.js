// Fix this path to point to your project's `memory-db.js` source file
const MemoryDB = require('../../src/model/data/memory/memory-db');

const {
  listFragments,
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
  deleteFragment,
} = require('../../src/model/data/memory/index');

describe('memory-db', () => {
  let db;

  // Each test will get its own, empty database instance
  beforeEach(() => {
    db = new MemoryDB();
  });

  test('put() returns nothing', async () => {
    const result = await db.put('a', 'b', {});
    expect(result).toBe(undefined);
  });

  test('get() returns what we put() into the db', async () => {
    const data = { value: 123 };
    await db.put('a', 'b', data);
    const result = await db.get('a', 'b');
    expect(result).toEqual(data);
  });

  test('put() and get() work with Buffers', async () => {
    const data = Buffer.from([1, 2, 3]);
    await db.put('a', 'b', data);
    const result = await db.get('a', 'b');
    expect(result).toEqual(data);
  });

  test('get() with incorrect secondaryKey returns nothing', async () => {
    await db.put('a', 'b', 123);
    const result = await db.get('a', 'c');
    expect(result).toBe(undefined);
  });

  test('query() returns all secondaryKey values', async () => {
    await db.put('a', 'a', { value: 1 });
    await db.put('a', 'b', { value: 2 });
    await db.put('a', 'c', { value: 3 });

    const results = await db.query('a');
    expect(Array.isArray(results)).toBe(true);
    expect(results).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });
  
  test('query() returns empty array', async () => {
    await db.put('b', 'a', { value: 1 });
    await db.put('b', 'b', { value: 2 });
    await db.put('b', 'c', { value: 3 });

    const results = await db.query('a');
    expect(Array.isArray(results)).toBe(true);
    expect(results).toEqual([]);
  });

  test('del() removes value put() into db', async () => {
    await db.put('a', 'a', { value: 1 });
    expect(await db.get('a', 'a')).toEqual({ value: 1 });
    await db.del('a', 'a');
    expect(await db.get('a', 'a')).toBe(undefined);
  });

  test('del() throws if primaryKey and secondaryKey not in db', () => {
    expect(() => db.del('a', 'a')).rejects.toThrow();
  });

  test('get() expects string keys', () => {
    expect(async () => await db.get()).rejects.toThrow();
    expect(async () => await db.get(1)).rejects.toThrow();
    expect(async () => await db.get(1, 1)).rejects.toThrow();
  });

  test('put() expects string keys', () => {
    expect(async () => await db.put()).rejects.toThrow();
    expect(async () => await db.put(1)).rejects.toThrow();
    expect(async () => await db.put(1, 1)).rejects.toThrow();
  });

  test('query() expects string key', () => {
    expect(async () => await db.query()).rejects.toThrow();
    expect(async () => await db.query(1)).rejects.toThrow();
  });

  test('del() expects string keys', () => {
    expect(async () => await db.del()).rejects.toThrow();
    expect(async () => await db.del(1)).rejects.toThrow();
    expect(async () => await db.del(1, 1)).rejects.toThrow();
  });

  // New unit tests for the index.js file

  test('writeFragment() writes fragment metadata to memory db', async () => {
    const fragment = {
      ownerId: 'user1',
      id: 'fragment1',
      data: { value: 123 },
    };

    await writeFragment(fragment);

    const result = await readFragment(fragment.ownerId, fragment.id);
    expect(result).toEqual(fragment);
  });

  test('readFragment() reads fragment metadata from memory db', async () => {
    const fragment = {
      ownerId: 'user1',
      id: 'fragment1',
      data: { value: 123 },
    };

    await writeFragment(fragment);

    const result = await readFragment(fragment.ownerId, fragment.id);
    expect(result).toEqual(fragment);
  });

  test('writeFragmentData() writes fragment data to memory db', async () => {
    const ownerId = 'user1';
    const id = 'fragment1';
    const data = Buffer.from([1, 2, 3]);

    await writeFragmentData(ownerId, id, data);

    const result = await readFragmentData(ownerId, id);
    expect(result).toEqual(data);
  });

  test('readFragmentData() reads fragment data from memory db', async () => {
    const ownerId = 'user1';
    const id = 'fragment1';
    const data = Buffer.from([1, 2, 3]);

    await writeFragmentData(ownerId, id, data);

    const result = await readFragmentData(ownerId, id);
    expect(result).toEqual(data);
  });

  test('listFragments() returns a list of fragment ids/objects for the given user', async () => {
    const ownerId = 'user1';

    const fragment1 = { ownerId, id: 'fragment1', data: { value: 1 } };
    const fragment2 = { ownerId, id: 'fragment2', data: { value: 2 } };
    const fragment3 = { ownerId, id: 'fragment3', data: { value: 3 } };

    await writeFragment(fragment1);
    await writeFragment(fragment2);
    await writeFragment(fragment3);

    const result = await listFragments(ownerId);
    expect(result).toEqual(['fragment1', 'fragment2', 'fragment3']);
  });

  test('listFragments() returns an empty array for a user with no fragments', async () => {
    const ownerId = 'user_without_fragments';
    const result = await listFragments(ownerId);
    expect(result).toEqual([]);
  });
  

  test('deleteFragment() deletes fragment metadata and data from memory db', async () => {
    const ownerId = 'user1';
    const id = 'fragment1';
    const data = Buffer.from([1, 2, 3]);

    await writeFragmentData(ownerId, id, data);

    await deleteFragment(ownerId, id);

    const metadataResult = await readFragment(ownerId, id);
    const dataResult = await readFragmentData(ownerId, id);

    expect(metadataResult).toBe(undefined);
    expect(dataResult).toBe(undefined);
  });

});

