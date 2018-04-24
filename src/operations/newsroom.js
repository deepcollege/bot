// @flow
import * as R from 'ramda';
import moment from 'moment';
import newsroomUtils from './newsroom-utils';

const handler = async ({ client }) => {
  moment.locale('en-AU');
  const yesterday = moment().subtract(1, 'day');

  // Place to post news back
  const newsroomChannel = client.channels.find('name', 'newsroom');

  const twdMLHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.TWD_MACHINE_LEARNING,
    dateSince: yesterday,
  });
  const twdDSHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.TWD_DATA_SCIENCE,
    dateSince: yesterday,
  });
  const twdProgHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.TWD_PROGRAMMING,
    dateSince: yesterday,
  });
  const twdVisualHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.TWD_VISUALISATION,
    dateSince: yesterday,
  });
  const tensorflow = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.TENSORFLOW_MEDIUM,
    dateSince: yesterday,
  });
  const intuitionMachine = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.INTUITION_MACHINE,
    dateSince: yesterday,
  });

  const appliedDsHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.APPLIED_DS,
    dateSince: yesterday,
  });
  const becomingHumanHits = await newsroomUtils.getHitsFromMedium({
    baseUrl: newsroomUtils.BECOMING_HUMAN,
    dateSince: yesterday,
  });
  const mlMasteryHits = await newsroomUtils.getMLMasteryHits({
    dateSince: yesterday,
  });

  const collection = R.compose(R.uniqBy(R.prop('url')), R.flatten)([
    twdDSHits,
    twdMLHits,
    twdProgHits,
    twdVisualHits,
    appliedDsHits,
    tensorflow,
    intuitionMachine,
    becomingHumanHits,
    mlMasteryHits,
  ]);

  await newsroomChannel.send(newsroomUtils.constructNews(collection));
};

export default {
  handler,
};
