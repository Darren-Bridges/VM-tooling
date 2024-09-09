export const getSelectedEnvironment = () => {
  return localStorage.getItem('selected-environment') || 'feature-branch';
};
