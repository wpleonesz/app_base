import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/siad/schedule');
};

const getByShedule = (idper: any, dni: any) => {
  return api.get(`/api/siad/schedule/${idper}/${dni}`);
};

const getBySheduleTeacher = (idper: any, dni: any) => {
  return api.get(`/api/siad/teacher/schedule/${idper}/${dni}`);
};

const getByQualification = (idper: any, dni: any) => {
  return api.get(`/api/siad/qualification/${idper}/${dni}`);
};

const getByStudentAttendance = (idnaa: any, dpa_id: any, dni: any) => {
  return api.get(`/api/siad/student/attendance/${idnaa}/${dpa_id}/${dni}`);
};

const getByPractExperimntl = (idper: any, dni: any) => {
  return api.get(`/api/siad/student/practical/${idper}/${dni}`);
};

const getBySchedulePractExperimntl = (idper: any, dni: any, idnaa: any) => {
  return api.get(
    `/api/siad/student/practical/schedule/${idper}/${dni}/${idnaa}`,
  );
};

const getByScheduleTeacherPractExperimntl = (idper: any, dni: any) => {
  return api.get(`/api/siad/teacher/practical/${idper}/${dni}`);
};

const getByGroupAsigPractExperimntl = (idper: any, dni: any, idasig: any) => {
  return api.get(
    `/api/siad/teacher/practical/group/asig/${idper}/${dni}/${idasig}`,
  );
};

const getByQualificacionPractExperimntl = (
  idper: any,
  dni: any,
  idnaa: any,
) => {
  return api.get(
    `/api/siad/student/practical/qualification/${idper}/${dni}/${idnaa}`,
  );
};

const getByScheduleBuss = (idper: any, dni: any) => {
  return api.get(`/api/siad/student/practical/bus/${idper}/${dni}`);
};

const getByPaymentsStudents = (dni: any) => {
  return api.get(`/api/siad/payments/v1/${dni}`);
};

export const academicService = {
  getAll,
  getByShedule,
  getBySheduleTeacher,
  getByQualification,
  getByStudentAttendance,
  getByPractExperimntl,
  getBySchedulePractExperimntl,
  getByScheduleTeacherPractExperimntl,
  getByGroupAsigPractExperimntl,
  getByQualificacionPractExperimntl,
  getByScheduleBuss,
  getByPaymentsStudents,
};
