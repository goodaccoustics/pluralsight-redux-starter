import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			course: Object.assign({}, this.props.course),
			errors: {},
			saving: false
		};

		this.updateCourse = this.updateCourse.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.course.id != nextProps.course.id) {
			// necessary to populate from when existing course is loaded directly
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	//updateCourseState(event) {
	updateCourse(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	courseFormIsValid() {
		let formIsValid = true;
		let errors = {};
		if (this.state.course.title.length < 5) {
			errors.title = 'title must be at least 5 characters';
			formIsValid = false;
		}
		this.setState({errors: errors});
		return formIsValid;
	}

	saveCourse(event) {
		event.preventDefault();
		if (!this.courseFormIsValid()) {
			return;
		}
		this.setState({saving: true});
		this.props.actions.saveCourse(this.state.course)
		.then(() => this.redirect('/courses'))
		.catch(error => {
			toastr.error(error);
			this.setState({saving: false});
		});
		//this.context.router.push('courses');
	}

	redirect(page) {
		this.setState({saving: false});
		toastr.success('Course saved');
		this.context.router.push(page);
	}

	render() {
		return (
			<CourseForm
				course={this.state.course} 
				allAuthors = {this.props.authors}
				errors = {this.state.errors}
				onChange={this.updateCourse}
				onSave={this.saveCourse}
				saving={this.state.saving}
			/>
		);
	}
}

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
	router: PropTypes.object
};

function getCourseById(courses, id) {
	const course = courses.filter(course => course.id == id);
	if (course) return course[0];
	return null;
}

function manageStateToProps(state, ownProps) {
	const courseId = ownProps.params.id; //from the path \course\:id
	
	let course = {
		id: '',
		watchHref: '',
		title: '',
		authorId: '',
		length: '',
		category: ''
	};

	if (courseId && state.courses.length > 0) {
		course = getCourseById(state.courses, courseId);
	}

	// following code placed in selectors/selectors.js
	//const authorsFormattedForDropdown = state.authors.map(author => {
	//	return {
	//		value: author.id,
	//		text: author.firstName + ' ' + author.lastName
	//	};
	//});

	return {
		course: course,
		authors: authorsFormattedForDropdown(state.authors)
	};
}

function manageDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch),
		
	};
}

export {ManageCoursePage as SkeletonManageCoursePage};
export default connect(manageStateToProps, manageDispatchToProps)(ManageCoursePage);
