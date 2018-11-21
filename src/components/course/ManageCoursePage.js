import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			course: Object.assign({}, this.props.course),
			errors: {}
		};

		this.updateCourse = this.updateCourse.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	//updateCourseState(event) {
	updateCourse(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	saveCourse(event) {
		event.preventDefault();
		this.props.actions.saveCourse(this.state.course);
	}

	render() {
		return (
			<CourseForm
				course={this.state.course} 
				allAuthors = {this.props.authors}
				errors = {this.state.errors}
				onChange={this.updateCourse}
				onSave={this.saveCourse}
			/>
		);
	}
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};


function manageStateToProps(state, ownProps) {
	let course = {
		id: '',
		watchHref: '',
		title: '',
		authorId: '',
		length: '',
		category: ''
	};

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});
	return {
		course: course,
		authors: authorsFormattedForDropdown
	};
}

function manageDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch),
		
	};
}

export default connect(manageStateToProps, manageDispatchToProps)(ManageCoursePage);
