import React, { useState } from 'react';
import CreateLinkMutation from '../mutations/CreateLinkMutation';

function CreateLink(props) {
  const initLink = {
    description: '',
    url: ''
  };

  const [link, setLink] = useState(initLink);

  const _createLink = () => {
    const { description, url } = link;
    CreateLinkMutation(description, url, () =>
      console.log(`Mutation completed`)
    );
  };

  const updateLink = (field, value) => {
    setLink({ ...link, [field]: value });
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={link.description}
          onChange={e => updateLink('description', e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={link.url}
          onChange={e => updateLink('url', e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <div className="button" onClick={_createLink}>
        submit
      </div>
    </div>
  );
}

export default CreateLink;
