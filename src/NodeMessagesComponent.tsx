import * as React from 'react';

import Paxos from './lib/paxos';

import { NodeState } from './AppState';
import MessagesComponent from './MessagesComponent';
import NodeComponent from './NodeComponent';


interface ComponentProps {
  paxos: Paxos;
  nodeState: NodeState;
  initiatePaxos: (nodeId: number, proposedValue: string) => void;
  deliverMessage: (messageId: string) => void;
  dropMessage: (messageId: string) => void;
  beginDraftingProposal: (nodeId: number) => void;
  endDraftingProposal: () => void;
  nodeIdDraftingProposal: number;
}

export default class NodeMessagesComponent extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const { nodeState } = this.props;
    return (
      <div className="node-messages-container">
        <div className="node-container">
          <NodeComponent
            nodeState={nodeState}
            initiatePaxos={this.props.initiatePaxos}
            beginDraftingProposal={this.props.beginDraftingProposal}
            endDraftingProposal={this.props.endDraftingProposal}
            nodeIdDraftingProposal={this.props.nodeIdDraftingProposal}
            paxos={this.props.paxos}
          />
        </div>
        <MessagesComponent
          nodeId={nodeState.id}
          messageStates={nodeState.messages}
          deliverMessage={this.props.deliverMessage}
          dropMessage={this.props.dropMessage}
          paxos={this.props.paxos}
        />
      </div>
    );
  }
}
