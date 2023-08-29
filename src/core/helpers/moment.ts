import * as moment from 'moment';

export const formateDate = (date: moment.MomentInput) => moment(date).format('MMM D, YYYY');
