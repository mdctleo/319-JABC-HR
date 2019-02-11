/**
 *
 * Asynchronously loads the component for Performance
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
