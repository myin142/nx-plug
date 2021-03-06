import { toAWSAttributeMap } from '../index';
import { fromAWSAttributeMap, toAWSAttributeMapArray, fromAWSAttributeMapArray } from './utils-aws';

describe('Utils AWS', () => {
	describe('To AWS AttributeMap', () => {
		it('skip null', () => {
			expect(toAWSAttributeMap(null)).toEqual(null);
		});

		it('skip null value', () => {
			expect(toAWSAttributeMap({ text: null })).toEqual({});
		});

		it('map string', () => {
			expect(toAWSAttributeMap({ text: 'Text' })).toEqual({
				text: { S: 'Text' },
			});
		});

		it('map number', () => {
			expect(toAWSAttributeMap({ num: 1 })).toEqual({
				num: { N: '1' },
			});
		});

		it('map string array', () => {
			expect(toAWSAttributeMap({ texts: ['hello', 'world'] })).toEqual({
				texts: { SS: ['hello', 'world'] },
			});
		});

		it('map number array', () => {
			expect(toAWSAttributeMap({ nums: [1, 2] })).toEqual({
				nums: { NS: ['1', '2'] },
			});
		});

		it('map object to string', () => {
			expect(toAWSAttributeMap({ obj: {} })).toEqual({
				obj: { S: '{}' },
			});
		});

		it('map object array to string array', () => {
			expect(toAWSAttributeMap({ arr: [{}, {}] })).toEqual({
				arr: {
					SS: ['{}', '{}'],
				},
			});
		});
	});

	describe('From AWS AttributeMap', () => {
		it('skip null', () => {
			expect(fromAWSAttributeMap(null)).toEqual(null);
		});

		it('skip null value', () => {
			expect(fromAWSAttributeMap({ text: null })).toEqual({});
		});

		it('skip empty', () => {
			expect(fromAWSAttributeMap({ text: {} })).toEqual({});
		});

		it('map string', () => {
			expect(fromAWSAttributeMap({ text: { S: 'Text' } })).toEqual({
				text: 'Text',
			});
		});

		it('map object string', () => {
			expect(fromAWSAttributeMap({ text: { S: `{"value": "1"}` } })).toEqual({
				text: { value: '1' },
			});
		});

		it('map array string', () => {
			expect(fromAWSAttributeMap({ text: { S: `[1, 2]` } })).toEqual({
				text: [1, 2],
			});
		});

		it('map number', () => {
			expect(fromAWSAttributeMap({ num: { N: '1' } })).toEqual({
				num: 1,
			});
		});

		it('map string array', () => {
			expect(fromAWSAttributeMap({ texts: { SS: ['hello', 'world'] } })).toEqual({
				texts: ['hello', 'world']
			});
		});

		it('map number array', () => {
			expect(fromAWSAttributeMap({ texts: { NS: ['1', '2'] } })).toEqual({
				texts: [1, 2],
			});
		});

		it('map object string array', () => {
			expect(fromAWSAttributeMap({ arr: { SS: [`{"value": 1}`, '{}'] } })).toEqual({
				arr: [{ value: 1 }, {}],
			});
		});

		it('map array string array', () => {
			expect(fromAWSAttributeMap({ arr: { SS: [`[1]`, `[2]`] } })).toEqual({
				arr: [[1], [2]],
			});
		});
	});

	it('map array to AWS AttributeMap', () => {
		expect(toAWSAttributeMapArray([{ text: 'Text', num: 1 }])).toEqual([
			{
				text: { S: 'Text' },
				num: { N: '1' },
			},
		]);
	});

	it('map array from AWS AttributeMap', () => {
		expect(fromAWSAttributeMapArray([{ text: { S: 'Text' }, num: { N: '1' } }])).toEqual([
			{
				text: 'Text',
				num: 1,
			},
		]);
	});
});
