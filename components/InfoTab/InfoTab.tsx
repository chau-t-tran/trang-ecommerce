import { Group, Stack, Paper, Text } from '@mantine/core';
import { IconPackages, IconDeviceMobileMessage, IconTruckDelivery } from '@tabler/icons-react';

export function InfoTab() {
  return (
    <Group grow spacing={0}>
      <Paper 
        withBorder 
        shadow="md" 
        p="sm" 
        style={{borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}
      >
        <Group>
          <IconPackages size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text fw={700} size={15}>
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
        style={{borderRadius: '0px', borderRight: 0, borderLeft: 0}}
      >
        <Group>
          <IconDeviceMobileMessage size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text fw={700} size={15}>
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
        style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}
      >
        <Group>
          <IconTruckDelivery size={30} style={{marginLeft: '15px'}}/>
          <Stack spacing={0}>
            <Text fw={700} size={15}>
              Vận chuyển rất nhanh
            </Text>
            <Text size={10}>
              Gửi hàng trong 1-2 ngày
            </Text>
          </Stack>
        </Group>
      </Paper>
    </Group>
  );
}
