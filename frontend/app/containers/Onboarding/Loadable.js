/**
 *
 * Asynchronously loads the component for Onboarding
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
