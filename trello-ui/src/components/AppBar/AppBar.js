import React from 'react';
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './AppBar.scss';

function AppBar() {
    return (
        <nav className="navbar-app">
            <BootstrapContainer className="trello-container">
                <Row>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="app-actions">
                            <div className="item all">
                                <i className="fa fa-th" />
                            </div>
                            <div className="item home">
                                <i className="fa fa-home" />
                            </div>
                            <div className="item boards">
                                <i className="fa fa-columns" />
                                <strong>Boards</strong>
                            </div>
                            <div className="item search">
                                <InputGroup className="group-search">
                                    <FormControl className="input-search" placeholder="Jump to ..." />
                                    <InputGroup.Text className="input-search-icon">
                                        <i className="fa fa-search" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="app-branching text-center">
                            <a href="https://www.facebook.com/SuperUltraDev/" target="_blank">
                                <img src="https://trello.com/favicon.ico" className="top-logo" alt="logo" />
                                <span className="slogan">Trello</span>
                            </a>
                        </div>
                    </Col>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="user-actions">
                            <div className="item qhick">
                                <i className="fa fa-plus-square-o" />
                            </div>
                            <div className="item news">
                                <i className="fa fa-info-circle" />
                            </div>
                            <div className="item notifications">
                                <i className="fa fa-bell-o" />
                            </div>
                            <div className="item avatar">
                                <img
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/340652220_259156609788298_3068216517350440573_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S130IVSs4cYAX_hC2U4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD87uHp4Tjnpif2e2eqdoyTpcdv-dm1AP-6g6l1XTUIVw&oe=64BEE480"
                                    className="avatar-img"
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    );
}

export default AppBar;
