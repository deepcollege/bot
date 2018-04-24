// @flow
import * as R from 'ramda';
import moment from 'moment';
import newroomUtils from './newsroom-utils';

const handler = async () => {
  moment.locale('en-AU');
  const yesterday = moment().subtract(1, 'day');

  // Place to post news back
  // Const newsroomChannel = client.channels.find('name', 'newsroom');

  const twdMLHits = await newroomUtils.getHitsFromMedium({
    baseUrl: newroomUtils.TWD_MACHINE_LEARNING,
    dateSince: yesterday,
  });
  const twdDSHits = await newroomUtils.getHitsFromMedium({
    baseUrl: newroomUtils.TWD_DATA_SCIENCE,
    dateSince: yesterday,
  });
  const twdProgHits = await newroomUtils.getHitsFromMedium({
    baseUrl: newroomUtils.TWD_PROGRAMMING,
    dateSince: yesterday,
  });
  const twdVisualHits = await newroomUtils.getHitsFromMedium({
    baseUrl: newroomUtils.TWD_VISUALISATION,
    dateSince: yesterday,
  });
  const appliedDsHits = await newroomUtils.getHitsFromMedium({
    baseUrl: newroomUtils.APPLIED_DS,
    dateSince: yesterday,
  });

  const mlMasteryHits = await newroomUtils.getMLMasteryHits({
    dateSince: yesterday,
  });

  const collection = R.compose(R.uniqBy(R.prop('url')), R.flatten)([
    twdDSHits,
    twdMLHits,
    twdProgHits,
    twdVisualHits,
    appliedDsHits,
    mlMasteryHits,
  ]);
  console.log(collection);
  // Await newsroomChannel.send(newroomUtils.constructNews(collection));
};

export default {
  handler,
};
