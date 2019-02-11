/**
 *
 * Asynchronously loads the component for Employees
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
