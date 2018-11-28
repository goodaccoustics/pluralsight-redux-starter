import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {SkeletonManageCoursePage} from './ManageCoursePage';

describe('Manage course page', () => {
	it('sets error message when trying to save empty title', () => {
		const props = {
			authors: [],
			actions: {
				saveCourse: () => {
					return Promise.resolve();
				}},
			course: {
				id: '',
				watchHref: '',
				title: '',
				authorId: '',
				length: '',
				category: ''
			}
		};

		const wrapper = mount(
			<SkeletonManageCoursePage {...props} />
		);
		const saveButton = wrapper.find('input').last();
		expect(saveButton.prop('type')).toBe('submit');
		saveButton.simulate('click');
		expect(wrapper.state().errors.title).toBe('title must be at least 5 characters');
	});
});
