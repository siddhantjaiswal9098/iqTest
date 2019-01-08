const MoveFinger = (entities, { touches }) => {
  touches.filter(t => t.type === 'move').forEach((t) => {
    const finger = entities[t.id];
    if (finger && finger.position) {
      finger.position = [
        finger.position[0] + t.delta.pageX,
        finger.position[1] + t.delta.pageY
      ];
    }
  });

  return entities;
};

export { MoveFinger };
