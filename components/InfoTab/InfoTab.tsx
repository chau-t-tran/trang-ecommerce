import { 
  createStyles,
  Group, 
  Stack, 
  Paper, 
  Text,
  SimpleGrid,
} from '@mantine/core';
import { IconPackages, IconDeviceMobileMessage, IconTruckDelivery } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  wrapperLeft: {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    [theme.fn.smallerThan("md")]: {
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
  },
  wrapperCenter: {
    borderRadius: '0px', 
    borderRight: 0, 
    borderLeft: 0,
    [theme.fn.smallerThan("md")]: {
      borderRight: 1,
      borderLeft: 1,
    },
  },
  wrapperRight: {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    [theme.fn.smallerThan("md")]: {
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomLeftRadius: '5px',
    },
  },
  title: {
    fontSize: 25,
    fontWeight: 700,
    [theme.fn.smallerThan("md")]: {
      fontSize: 20,
    },
  },
}));

export default function InfoTab() {
  const { classes } = useStyles();

  return (
    <SimpleGrid 
      cols={3}
      spacing={0}
      breakpoints={[
        { maxWidth: '62rem', cols: 3 },
        { maxWidth: '36rem', cols: 1 },
      ]}
    >
      <Paper 
        withBorder 
        shadow="md" 
        p="sm" 
        className={classes.wrapperLeft}
      >
        <Group>
          <IconPackages size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text className={classes.title}>
              Mua lượng lớn
            </Text>
            <Text size={10}>
              Mua số lượng lớn giảm giá
            </Text>
          </Stack>
        </Group>
      </Paper>
      <Paper 
        withBorder 
        shadow="md" 
        p="sm"
        className={classes.wrapperCenter}
      >
        <Group>
          <IconDeviceMobileMessage size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text className={classes.title}>
              Đặt rau online
            </Text>
            <Text size={10}>
              Dịch vụ giao rau cải
            </Text>
          </Stack>
        </Group>
      </Paper>
      <Paper 
        withBorder 
        shadow="md" 
        p="sm"
        className={classes.wrapperRight}
      >
        <Group>
          <IconTruckDelivery size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text className={classes.title}>
              Vận chuyển rất nhanh
            </Text>
            <Text size={10}>
              Gửi hàng trong 1-2 ngày
            </Text>
          </Stack>
        </Group>
      </Paper>
    </SimpleGrid>
  );
}
