import * as React from 'react';

import { Message } from './lib/message_types';
import PaxosNode from './lib/paxos_node';
import Paxos from './lib/paxos';

import { NodeState, ProposerState, ReceiverState, LearnerState } from './AppState';
import ProposalModalComponent from './ProposalModalComponent';


interface ComponentProps {
  nodeState: NodeState;
  initiatePaxos: (nodeId: number, proposedValue: string) => void;
  beginDraftingProposal: (nodeId: number) => void;
  endDraftingProposal: () => void;
  nodeIdDraftingProposal: number;
  paxos: Paxos;
}

const ProposerComponent = ({ proposerState }: { proposerState: ProposerState }) => {
  const { isProposing, proposalNumber, proposedValue, responses, phase } = proposerState;
  if (isProposing) {
    return (
      <div className="proposer-component">
        <div className="node-text">
          PN: {proposalNumber}
        </div>
        <div className="node-text">
          PV: {proposedValue}
        </div>
        <div className="node-text">
          responses: {responses}
        </div>
        <div className="node-text">
          phase: {phase}
        </div>
      </div>
    );
  } else {
    return (
      <div className="proposer-component">
        <div className="node-text">
          not proposing
        </div>
      </div>
    );
  }
};

const ReceiverComponent = ({ receiverState }: { receiverState: ReceiverState }) => {
  const { highestSeenProposalNumber, acceptedValue } = receiverState;
  return (
    <div className="receiver-component">
      <div className="node-text">
        promised PN: {receiverState.highestSeenProposalNumber}
      </div>
      <div className="node-text">
        accepted: {receiverState.acceptedValue}
      </div>
    </div>
  );
};

const LearnerComponent = ({ learnerState }: { learnerState: LearnerState }) => {
  const { responses, learnedValue } = learnerState;
  return (
    <div className="learner-component">
      <div className="node-text">
        responses: {learnerState.responses}
      </div>
      <div className="node-text">
        LV: {learnerState.learnedValue}
      </div>
    </div>
  );
};

export default class NodeComponent extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);
  }

  handleClick = () => {
    this.props.beginDraftingProposal(this.props.nodeState.id);
  }

  render() {
    const { nodeState } = this.props;

    const { id, proposer, receiver, learner } = nodeState;

    return (
      <div className="node-component">
        <div className="node-label">
          Node #{id}
        </div>
        <div className="roles-container">
          <ProposerComponent proposerState={proposer}/>
          <div className="receiver-learner-container">
            <ReceiverComponent receiverState={receiver}/>
            <LearnerComponent learnerState={learner}/>
          </div>
        </div>
        <button
          className="initiate-paxos-button"
          onClick={this.handleClick}
          disabled={this.props.nodeIdDraftingProposal !== -1}
        >
          Initiate Paxos
        </button>
        {this.props.nodeIdDraftingProposal === nodeState.id &&
          <ProposalModalComponent
            nodeState={this.props.nodeState}
            initiatePaxos={this.props.initiatePaxos}
            endDraftingProposal={this.props.endDraftingProposal}
          />
        }
      </div>
    );
  }
}
