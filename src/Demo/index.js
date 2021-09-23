import ErrorDetection from './ErrorDetection';
import Finished from './Finished';
import FixingErrors from './FixingErrors';
import Paginating from './Paginating';
import Welcome from './Welcome';

export const steps = { 
    'welcome': Welcome,
    'error-detection': ErrorDetection,
    'paginating': Paginating,
    'fixing-errors': FixingErrors,
    'finished': Finished,
}