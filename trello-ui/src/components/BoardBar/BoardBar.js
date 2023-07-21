import React from 'react';
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

import './BoardBar.scss';

function BoardBar() {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className="trello-container">
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding">
                        <div className="board-info">
                            <div item board-logo-icon>
                                <i className="fa fa-coffee" />
                                <strong>Đồ án chuyên ngành</strong>
                            </div>
                            <div className="divider"></div>
                            <div className="item board-type">Private Workspace</div>
                            <div className="divider"></div>

                            <div className="item member-avatar">
                                <img
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/340652220_259156609788298_3068216517350440573_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S130IVSs4cYAX_hC2U4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD87uHp4Tjnpif2e2eqdoyTpcdv-dm1AP-6g6l1XTUIVw&oe=64BEE480"
                                    alt="avatar"
                                    title="avatar"
                                />
                                <img
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/340652220_259156609788298_3068216517350440573_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S130IVSs4cYAX_hC2U4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD87uHp4Tjnpif2e2eqdoyTpcdv-dm1AP-6g6l1XTUIVw&oe=64BEE480"
                                    alt="avatar"
                                    title="avatar"
                                />
                                <img
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/340652220_259156609788298_3068216517350440573_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S130IVSs4cYAX_hC2U4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD87uHp4Tjnpif2e2eqdoyTpcdv-dm1AP-6g6l1XTUIVw&oe=64BEE480"
                                    alt="avatar"
                                    title="avatar"
                                />
                                <img
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/340652220_259156609788298_3068216517350440573_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S130IVSs4cYAX_hC2U4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD87uHp4Tjnpif2e2eqdoyTpcdv-dm1AP-6g6l1XTUIVw&oe=64BEE480"
                                    alt="avatar"
                                    title="avatar"
                                />
                                <span className="more-member">+7</span>
                                <span className="invite">Invite</span>
                            </div>
                        </div>
                    </Col>

                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                            <div className="item menu">
                                <i className="fa fa-ellipsis-h mr-2" />
                                Show menu
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default BoardBar;
