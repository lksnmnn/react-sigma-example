import React, { Component } from 'react';
import {UndirectedGraph} from 'graphology';
import complete from 'graphology-generators/classic/complete';
import randomLayout from 'graphology-layout/random';
import chroma from 'chroma-js';
import faker from 'faker';
import WebGLRenderer from 'sigma/renderers/webgl';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div id="container"></div>
      </div>
    );
  }

  componentDidMount() {
    const container = document.getElementById("container");

    const graph = complete(UndirectedGraph, {order: 10});
    randomLayout.assign(graph);
    
    graph.nodes().forEach(node => {
      const attr = graph.getNodeAttributes(node);
    
      graph.mergeNodeAttributes(node, {
        label: faker.name.findName(),
        size: Math.max(4, Math.random() * 10),
        color: chroma.random().hex()
      });
    });
    
    const renderer = new WebGLRenderer(graph, container);
    
    window.graph = graph;
    window.renderer = renderer;
    window.camera = renderer.camera;
  }
}

export default App;
