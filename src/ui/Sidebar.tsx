import styled from "styled-components";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
`;
const Sidebar: React.FC = () => {
  return <StyledSidebar>SIDEBAR</StyledSidebar>;
};

export default Sidebar;
